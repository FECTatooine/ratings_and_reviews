import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 10,
  duration: '100s',
  gracefulStop: '45s'
}

// const max = 1000011 //highest product id
const max = 50
const min = Math.floor(max * .90)
const rndproduct = Math.floor(Math.random() * (max - min + 1)) + min

const url = `http://localhost:3000/reviews/?product_id=${rndproduct}`

export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 2000ms' : r => r.timings.duration < 2000,
  });
}
