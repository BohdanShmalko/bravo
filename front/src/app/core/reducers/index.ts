import { ActionReducerMap } from '@ngrx/store';

import {authNode, authReducer, AuthState} from '@core/reducers/auth/auth.reducers';
import {AuthActions} from '@core/reducers/auth/auth.actions';
import {AuthEffects} from '@core/reducers/auth/auth.effects';
import {userNode, userReducer, UserState} from "@core/reducers/usrer/user.reducers";
import {UserActions} from "@core/reducers/usrer/user.actions";
import {UserEffects} from "@core/reducers/usrer/user.effects";

export interface State {
  [ authNode ]: AuthState,
  [ userNode ]: UserState
}

export type GlobalActionType = AuthActions & UserActions;

export const reducers : ActionReducerMap<State, GlobalActionType> = {
  [ authNode ]: authReducer,
  [ userNode ]: userReducer,
}

export const effects = [ AuthEffects, UserEffects ];
