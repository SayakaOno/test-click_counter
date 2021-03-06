import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('clicking button increments counter display', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('1');
});

test('clicking decrement button decrements counter display', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const counter = findByTestAttr(wrapper, 'count').text();
  expect(counter).toBe('0');
});

test("count doesn't go below zero", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('display an error message when counter is 0 and decrement button is clicked ', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

test('error is removed when increment button is clicked', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});
