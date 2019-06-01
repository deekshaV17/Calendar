const actions = {
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
}

const addEvent = (payload) => ({
  type: actions.ADD_EVENT,
  payload,
});

const updateEvent = (payload) => ({
  type: actions.UPDATE_EVENT,
  payload,
});

const deleteEvent = (payload) => ({
  type: actions.DELETE_EVENT,
  payload,
});

export { actions, addEvent, updateEvent, deleteEvent };