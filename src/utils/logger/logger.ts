export const logRequest = (
  body: any,
  destination: string,
  requestId: string
) => {
  const currentTime = new Date();
  const log = {
    requestId: requestId,
    time: currentTime,
    type: "REQUEST",
    message: "New request recieved",
    destination: destination,
    requestBody: JSON.stringify(body),
  };
  console.log(log);
  return;
};

export const logResponse = (
  requestBody: any,
  response: any,
  location: string,
  requestId: string
) => {
  const currentTime = new Date();
  const log = {
    requestId: requestId,
    time: currentTime,
    type: "RESPONSE",
    location: location,
    requestBody: JSON.stringify(requestBody),
    responseBody: JSON.stringify(response),
  };
  console.log(log);
  return;
};

export const logError = (
  body: any,
  destination: string,
  location: string,
  status: number,
  data: any,
  requestId: string
) => {
  const currentTime = new Date();
  const log = {
    requestId: requestId,
    time: currentTime,
    type: "ERROR",
    location: location,
    destination: destination,
    requestBody: JSON.stringify(body),
    data: data,
    status: status,
  };
  console.error(log);
  return;
};
