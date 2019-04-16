export const getWeatherData = async city => {
  // key will expire June 15, 2019
  const APIkey = "6e4c03029efe4b14b5c140119191604";
  try {
    let response = await fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIkey}&q=${city}&format=json&num_of_days=1`
    );
    response = await response.json();
    //to catch any errors returned by server
    if (response.data.error) {
      return null;
    }

    return response.data;
  } catch (error) {
    //to catch any server errors ie. server down
    console.log(error);
    return null;
  }
};
