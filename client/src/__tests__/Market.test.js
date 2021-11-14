import React from 'react';
import { shallow } from 'enzyme';
import Market from '../views/Market';

it("renders without crashing", () => {
    shallow(<Market />)
})