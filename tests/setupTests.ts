import '@testing-library/jest-dom';
import { server } from './server';

global.URL.createObjectURL = jest.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
