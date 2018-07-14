
import { toQueryString, toQueryObject } from '../queryString';


describe('toQueryString', () => {
  it('Transforms an object with one property to a string', () => {
    const query = {
      "Hello": "World"
    };
    const expectedOutput = "?Hello=World";

    expect(toQueryString(query)).toEqual(expectedOutput);
  });
  it('It transforms an object with one boolean property to a string', () => {
    const query = {
      check: true
    };
    const expectedOutput = "?check=true";
  });
});

describe('toQueryObject', () => {
  it('Transforms a string to an object', () => {
    const query = "?object=%7Ba%3A%20'b'%2C%20c%3A%20'd'%2C%20e%3A%20true%2C%20d%3A5%7D&Hello=World&size=5&check=true";
    const expectedOutput = {
      object: "{a: 'b', c: 'd', e: true, d:5}",
      Hello: "World",
      check: "true",
      size: "5"
    };

    expect(toQueryObject(query)).toEqual(expectedOutput);
  });
});

describe('toQueryString and toQueryObject', () => {
  it('Transforms a string to an object and back', () => {
    const query = "?%C3%A6=%C3%A5&true=false";

    expect(toQueryString(toQueryObject(query))).toEqual(query);
  });
  it('Transforms an object to a string and back', () => {
    const query = {
      "æ": "å",
      true: false,
      [5]: 1
    };
    expect(toQueryObject(toQueryString(query))).toEqual(query);
  });
});