const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = _ => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        return callback(new Error(`HTTP error: ${xhr.status}`));
      }
      try {
        callback(null, JSON.parse(xhr.responseText));
      } catch (err) {
        callback(err);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};