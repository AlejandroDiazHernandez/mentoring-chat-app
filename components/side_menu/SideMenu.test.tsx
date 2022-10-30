import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SideMenu, SideMenuProps } from './SideMenu';

const sideMenuDefaultProps: SideMenuProps = {
  rooms: [
    { name: 'Room1', participants: [] },
    { name: 'Room2', participants: [] },
  ],
  createRoom: jest.fn(),
};

const roomName = 'room name';

const renderSideMenu = (props: Partial<SideMenuProps> = {}) => {
  return render(<SideMenu {...sideMenuDefaultProps} {...props} />);
};

describe('SideMenu', () => {
  test('renders properly', () => {
    renderSideMenu();
  });

  test('render rooms passed', () => {
    renderSideMenu();
    const rooms = screen.getAllByRole('listitem');
    expect(rooms).toHaveLength(2);
  });

  test('Add button onClick creates room', () => {
    renderSideMenu();

    // Open modal
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Set room name
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: roomName } });

    // Click on createRoom
    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);

    expect(sideMenuDefaultProps.createRoom).toHaveBeenCalledTimes(1);
    expect(sideMenuDefaultProps.createRoom).toHaveBeenCalledWith(roomName);
  });
});
