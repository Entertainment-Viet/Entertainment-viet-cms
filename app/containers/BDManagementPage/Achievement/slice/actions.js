import {
  CREATE_ACHIEVEMENT,
  LOAD_ACHIEVEMENT,
  LOAD_ACHIEVEMENT_SUCCESS,
  LOAD_ACHIEVEMENT_ERROR,
} from './constants';

export function createAchievement(id) {
  return {
    type: CREATE_ACHIEVEMENT,
    id,
  };
}
export function loadAchievement() {
  return {
    type: LOAD_ACHIEVEMENT,
  };
}
export function loadAchievementSuccess(data) {
  return {
    type: LOAD_ACHIEVEMENT_SUCCESS,
    data,
  };
}
export function loadAchievementError(error) {
  return {
    type: LOAD_ACHIEVEMENT_ERROR,
    error,
  };
}
