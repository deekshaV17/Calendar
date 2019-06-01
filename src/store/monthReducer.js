import { actions } from './monthActions';
import { deleteEvent, updateEvent } from './operations';

import moment from 'moment';

const initialState = {
  events: [
    {
      id: 1,
      text: "Event 1",
      day: moment(new Date()),
      backColor: "#cc0000"
    },
  ],
};

const MonthReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case (actions.ADD_EVENT):
      return {
        ...state,
        events: [...state.events, payload],
      }

    case (actions.UPDATE_EVENT):
      return {
        ...state,
        events: updateEvent(state.events, payload),
      }

    case (actions.DELETE_EVENT):
      return {
        ...state,
        events: deleteEvent(state.events, payload),
      }

    default:
      return state;
  }
}

export default MonthReducer;
