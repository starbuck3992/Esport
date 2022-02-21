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
                'max_players' => $request->maxPlayers,
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

            $tournament = Tournament::where('slug', $request->slug)->where('tournament_status_id', 1)->firstorfail();

            $playerExist = $tournament->tournamentMatches()->where('user_home', $userId)->orWhere('user_guest', $userId)->exists();

            if ($playerExist) {
                return response()->json(['message' => 'Již jsi registrován'], 400);
            }

            $currentCount = $tournament->registered_count;
            $registrationSequence = unserialize($tournament->registration_sequence);

            $position = explode('-', $registrationSequence[$currentCount]);

            $bracket_position = $position[0];
            $player_position = $position[1] === 'a' ? 'user_home' : 'user_guest';

            $tournament->tournamentMatches()->updateOrCreate(
                ['bracket_position' => (int)$bracket_position],
                [$player_position => $userId]
            );

            $currentCount += 1;

            if ($currentCount === $tournament->max_players) {
                $tournament->tournament_status_id = 2;
            }

            $tournament->registered_count = $currentCount;
            $tournament->save();

            return response()->json(['message' => 'Byl jsi registrován do turnaje']);


        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Nastala chyba při registraci do turnaje'], 500);

        }

    }

    public function showTournament($slug)
    {
        try {

            return (new TournamentShowResource(Tournament::with(['platform', 'game', 'tournamentType', 'tournamentStatus', 'currency', 'tournamentMatches.userHome','tournamentMatches.userGuest'])
                ->where('slug', $slug)->firstOrFail()));

        } catch (Throwable $e) {

            report($e);
            return response()->json(['message' => 'Turnaj nenalezen'], 404);

        }
    }
}
