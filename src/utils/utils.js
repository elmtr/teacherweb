export function findInterval(intervals, time) {

  intervals = [
    {
      "number": 1,
      "start": 7.3,
      "end": 8.2
    },
    {
      "number": 2,
      "start": 8.3,
      "end": 9.2
    },
    {
      "number": 3,
      "start": 9.3,
      "end": 10.2
    },
    {
      "number": 4,
      "start": 10.3,
      "end": 11.2
    },
    {
      "number": 5,
      "start": 11.25,
      "end": 12.15
    },
    {
      "number": 6,
      "start": 12.2,
      "end": 13.1
    },
    {
      "number": 7,
      "start": 13.2,
      "end": 14.1
    },
    {
      "number": 8,
      "start": 14.2,
      "end": 15.1
    },
    {
      "number": 9,
      "start": 15.2,
      "end": 16.1
    },
    {
      "number": 10,
      "start": 16.2,
      "end": 17.1
    },
    {
      "number": 11,
      "start": 17.15,
      "end": 18.05
    },
    {
      "number": 12,
      "start": 18.10,
      "end": 19.0
    }
  ]


  for (let intervalIndex in intervals) {
    let interval = intervals[intervalIndex]
    if (time > interval.start && time < interval.end) {
      return interval.number
    }
  }
}

export let months = {
  "01": "ianuarie",
  "02": "februarie",
  "03": "martie",
  "04": "aprilie",
  "05": "mai",
  "06": "iunie",
  "07": "iulie",
  "08": "august",
  "09": "septembrie",
  "10": "octombrie",
  "11": "noiembrie",
  "12": "decembrie",
}