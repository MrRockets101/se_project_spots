_handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

.then((res) => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });

.then(_handleServerResponse(res));