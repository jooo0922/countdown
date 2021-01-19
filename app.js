'use strict';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
// Document.querySelector() 는 이런식으로 또는, 아래 예시처럼 복잡한 선택자도 사용할 수 있음. 아주 강력한 기능!
// ex> const el = document.querySelector("div.user-panel.main input[name=login]");
// console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// 긍까 이게 뭐냐면 현재 날짜에서 얼마만큼 남은 기한을 주고싶은지를 정해서 데드라인을 정하려고 만든거임.
// 이거를 데드라인 날짜 자체를 쓰는 게 아니고, 데드라인까지 남은 날짜를 더해서 데드라인을 정하고 싶을 때 쓰려는거 같음.
// 현재 날짜값들을 변수로 가져와서 거기에 원하는 남은 기한을 더해서 데드라인을 만드는 식으로 하려는거지.

// let futureDate = new Date(2021, 1, 4, 10, 40, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
// 현재 날짜를 return받고 싶다면 그냥 new Date()하면 되고,
// 만약 특정 날짜를 받고 싶으면 ()안에 해당하는 date의 값들을 (년, 월, 일, 시, 분, 초, 밀리세컨트) 순으로 넣어주면 됨.
// 참고로 month값을 넣을때는 1월부터 12월이 0~11의 인덱스로 지정되어 있으므로, 해당 인덱스값을 잘 확인하고 넣을 것! 
// console.log(futureDate);

// 이제 giveaway에 넣고 싶은 특정 미래 날짜, 즉 데드라인 날짜의 값들을 하나하나 extract 하려는 거임. 
// Date의 API들을 이용해서! 얘내들을 잘 기억해뒀다가 나중에 필요할 때 사용할 것...
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// month가 좀 어렵다. 왜냐면, getMonth()는 콘솔창에 표현된 month name이 아닌 index값을 return하기 때문..
// 그래서 이 index를 다시 month name으로 바꿔서 giveaway에 넣으려고 맨위에 const months 배열을 저장해놨던거임.
let month = futureDate.getMonth();
// console.log(months[month]);
month = months[month]; // month의 값은 사실상 index이니 이거를 실제 month name으로 override 하려고 let으로 만든 거.

// getDate() 현지 시간에 따라, 주어진 날짜의 일에 해당하는 1 이상 31 이하의 정수를 return.
const date = futureDate.getDate();
// console.log(date);

// getDay() 도 getMonth()처럼 일~월 까지의 요일에 지정된 0~6까지의 index를 반환함.
// const weekday = futureDate.getDay();
// console.log(weekday);
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

/**
 * 이제 뭘 할거냐면, 데드라인 날짜의 값들을 우리가 가져왔고,
 * 또 현재 날짜의 값들도 우리는 가져올 수 있으니까
 * 두 dates를 빼서 얼마만큼 남았는지, 남은 날짜를 계산해서 실시간으로 보여주는 거를 할거임.
 * 한 마디로, .deadline 안에 있는 것들을 만들어준다는 것이지...
 */

// future time in ms(밀리세컨드)
/**
 * getTime()
 * 1970 년 1 월 1 일 00:00:00 UTC와 주어진 날짜 사이의 경과 시간 (밀리 초)을 return함.
 * 그니까 저 날짜를 기준으로 얼마 만큼의 시간이 지났는지, 경과한 시간을 밀리 세킨드 단위로 반환하는거임.
 * 내 생각에는 저 메소드가 만들어진 날짜같기도 하고...
 * 
 * 암튼 주의할 점은 음수값으로 나오면 저 기준 날짜 이전의 날짜라는 뜻이고,
 * 경과시간을 밀리세컨드 단위로 계산해서 return한다는 거!
 */
const futureTime = futureDate.getTime();
// console.log(futureTime);

function getRemainingTime(){
  const today = new Date().getTime();
  // console.log(today); futureTime > today 일 수밖에 없음. 왜냐면 말 그대로 '미래날짜'니까 경과시간은 '현재날짜'보다 더 크겠지.

  const t = futureTime - today; // 한마디로 데드라인까지 남은 날짜겠지?
  // console.log(t);
  // 1s = 1000ms
  // 1min = 60s
  // 1hr = 60min
  // 1day = 24hr 
  // 즉, 밀리세컨드 값만 알면 일, 시, 분, 초의 값을 모두 구할 수 있다는 거임.
  // 예를 들어, 1day가 몇 ms인지 알면, 그 값으로 t를 나눠서 days가 얼마나 남았는지 알 수 있고,
  // 나눈 뒤의 나머지 값들은 시, 분, 초로 표현할 수 있다는 뜻. 

  // 참고로 또 재미있는 점 하나, t값은 reload할때마다 계속 줄어듦. 
  // 왜냐면 today 값은 현재 시간이라 계속 갱신되고 있기 때문에!

  // values in ms -> 1day, 1hour, 1min 각각을 ms로 표현한 값을 구하려는 거.
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  
  // calculate all values
  // t값이 항상 줄어들테니까 days도 값이 계속 바뀔테니 let
  let days = t/oneDay; 
  // console.log(days); 여기서 return되는 값의 소숫점 아래부분은 남은 시, 분, 초로 나중에 'hours'를 계산할 때 쓰임.
  // 우리는 여기서 정수 부분의 값만 얻으면 된다. 그러면 '남은 days'을 얻게 됨.
  days = Math.floor(days);

  // hour은 t에서 day로 나누고 남은 값, 즉 나머지 값에서 oneHour을 나눠야 남은 hours을 알 수 있지.
  // 이 나머지값이 위에서 말한 소숫점 아래부분이랑 똑같은겨!
  // 그래서 나머지 연산자로 oneDay를 t로 나누고 남은 나머지를 oneHour로 나눈 것!
  let hours = (t % oneDay) / oneHour;
  // console.log(hours); 
  // let hourss = t / oneHour;
  // console.log(`${hours} and ${hourss}`); 
  // t를 바로 나누든, t를 oneDay와 나눈 나머지값과 나누든 아래 소숫점은 똑같이 나옴. 
  // 왜? oneHour로 나누기 때문에! 같은 'hour' 단위로 나누니까 소숫점은 똑같이 떨어지는거야. 분 단위의 남은 시간은 똑같으니까. 
  // 그러니 얘내는 남은 분 단위를 계산할 때 쓰이겠지.
  // 마찬가지로 우리는 hours에서 정수 부분의 값만 얻으면 된다.
  hours = Math.floor(hours)
  
  // 같은 원리로 minutes, seconds 도 계산해주자.
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000); 
  // 1000ms = 1s 니까, 지금 모든 계산이 ms단위로 이뤄지고 있으니 oneSecond로 나누려면 1000ms로 나누면 되겠지?

  // set values array
  // 굳이 배열로 만들어준 이유는 item Nodelist에 있는 각각에 넣어줘야 하기 때문!
  const values = [days, hours, minutes, seconds];

  // 이거는 각각의 value의 item들이 10을 넘지 않으면, 즉 한자릿수면 앞에 0을 붙이려고 만든 거.
  function format(item){
    if (item < 10) {
      return item = `0${item}`
    }
    return item;
  }

  // arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])
  // forEach(funtion())의 콜백함수는 두 번째 파라미터로 index즉, 처리할 현재 요소(currentValue)의 인덱스 값도 파라미터로 받을 수 있음!!
  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  // 이 상태로 끝내면 설정한 데드라인을 지나면 에러가 뜸. 아래는 이걸 고치려고 만든 것.
  if (t < 0) { // 즉, t가 0보다 작다는 건 남은 시간이 0보다 작다는 것. 즉 기한이 지났다는 거지.
    /**
     * clearInterval()
     * The ID value returned by setInterval() is used as the parameter for the clearInterval() method. 
     * Note: To be able to use the clearInterval() method, you must use a variable when creating the interval method
     * 
     * clearInterval은 setInterval에서 설정한 인터벌을 정지시켜 줌.
     * 근데 이걸 쓰려면 Interval ID를 파라미터로 전달해서 호출해줘야 함.
     * 
     * 이걸 어디서 구하냐고? 이거는 setInterval()이 return 해주는거임.
     * 그래서 만약에 clearInterval을 쓰고싶으면 setInterval이 return해주는 Interval ID값을 어디에다 저장해둬야 함.
     * 그래서 setInterval(); 을 호출할 때 let countdown에 리턴값을 할당하면서 호출한거야. 
     * 
     * 그래야 리턴값을 countdown에 저장해놓고 나중에 clearInterval()를 사용하고 싶을 때 써먹을 수 있으니까
     */
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired.</h4>`;
    // innerHTML은 항상 override하기 때문에 .deadline안에 있던 기존 태그들은 다 사라지고
    // 해당 HTMLString만 들어가서 화면에 나타날것임. 이걸 항상 명심할 것.
  }
}
// countdown
// The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
// setInterval(function, milliseconds, param1, param2, ...)
// 오랜만에 봐서 까먹은 함수인데, ms단위 시간간격을 두고 콜백함수를 반복 호출해주는 메소드임.
// 그니까 1000ms = 1초 간격으로 getRemainingTime()을 호출해서 남은 시간을 1초마다 html에 갱신해서 보여줌!
// 여기서 innerhtml은 innerhtml대로 처리하고, setInterval의 return값은 countdown에 넣어주는 거겠죠?
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();