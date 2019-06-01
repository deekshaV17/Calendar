const updateEvent = (list, payload) => {
  const index = list.find((item) => item.id === payload.id);

  if(index > -1) {
    list[index] = payload
  }

  return list;
}

const deleteEvent = (list, id) => {
  const index = list.find((item) => item.id === id);

  list.splice(index, 1);

  return list;
}

export { deleteEvent, updateEvent };