<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TournamentCreateRequest;
use App\Http\Resources\CurrencyResource;
use App\Http\Resources\GameResource;
use App\Http\Resources\PlatformResource;
use App\Http\Resources\Tournaments\TournamentShowResource;
use App\Http\Resources\Tournaments\TournamentTypeResource;
use App\Models\Currency;
use App\Models\Game;
use App\Models\Platform;
use App\Models\Tournament;
use App\Models\TournamentType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class TournamentController extends Controller
{
    public function getCreateFormData()
    {

        try {

            return [
                'games' => GameResource::collection(Game::all()),
                'platforms' => PlatformResource::collection(Platform::all()),
                'tournamentTypes' => TournamentTypeResource::collection(TournamentType::all()),
                'currencies' => CurrencyResource::collection(Currency::all()),
            ];

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Nastala chyba při získávání dat'], 404);

        }

    }

    public function createTournament(TournamentCreateRequest $request)
    {

        try {

            switch ($request->maxPlayers) {
                case 8:
                    $sequence = array('1-a', '1-b', '2-a', '2-b', '3-a', '3-b', '4-a', '4-b');
                    break;
                case 16:
                    $sequence = array('1-a', '1-b', '2-a', '2-b', '3-a', '3-b', '4-a', '4-b', '5-a', '5-b', '6-a', '6-b', '7-a', '7-b', '8-a', '8-b');
                    break;
                default:
                    $sequence = array('1-a', '1-b', '2-a', '2-b', '3-a', '3-b', '4-a', '4-b');
            }
            shuffle($sequence);

            $slug = Str::slug($request->name);

            $tournament = new Tournament([
                'platform_id' => $request->platform,
                'game_id' => $request->game,
                'tournament_status_id' => 1, //OPEN,
                'tournament_type_id' => $request->tournamentType,
                'currency_id' => $request->currency,
                'name' => $request->name,
                'information' => $request->information,
                'fee' => $request->fee,
                'schedule_start' => $request->scheduleStart,
                'registration_sequence' => serialize($sequence),
                'slug' => $slug
            ]);

            $tournament->save();

            return response()->json([
                'message' => 'Turnaj byl vytvořen',
                'slug' => $slug
            ]);

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => $e], 500);

        }

    }

    public function registerParticipant(Request $request)
    {

        try {

            $userId = Auth::id();

            //check if user can register
            $tournament = Tournament::where('slug', $request->slug)->where('tournament_status_id', 1)->whereHas(
                'tournamentMatches', function ($query) use ($userId) {
                $query->where('user_guest', '!=', $userId)->orWhere('user_home', '!=', $userId);
            })->firstorfail();

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Nastala chyba při získávání dat'], 404);

        }

    }

    public function showTournament($slug)
    {
        try {

            $tournament = Tournament::with(['platform', 'game', 'tournamentType', 'tournamentStatus', 'currency'])
                ->where('slug', $slug)->firstOrFail();

            //Count players
            $player_count = $tournament->tournamentMatches()->select(
                DB::raw('COUNT(DISTINCT team_guest) + COUNT(DISTINCT team_home) + COUNT(DISTINCT user_guest) + COUNT(DISTINCT user_home) AS SUM'))
                ->whereBetween('bracket_position', [1, $tournament->tournamentType->max_players / 2])->get()->toArray()[0]['SUM'];

            return (new TournamentShowResource(Tournament::with(['platform', 'game', 'tournamentType', 'tournamentStatus', 'currency'])
                ->where('slug', $slug)->firstOrFail()))->additional(['registered_count' => $player_count]);

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Turnaj nenalezen'], 404);

        }
    }
}
