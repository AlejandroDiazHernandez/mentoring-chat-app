import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import { SideMenu, SideMenuProps } from './SideMenu'

const sideMenuDefaultProps: SideMenuProps = {
  rooms: [
    {name: "Room1", participants: []},
    {name: "Room2", participants: []}
  ],
  createRoom: jest.fn()
}

const renderSideMenu = (props: Partial<SideMenuProps> = {}) => {
  return render(<SideMenu {...sideMenuDefaultProps} {...props} />)
}

describe("SideMenu", () => {
  test("renders properly", () => {
    renderSideMenu();
  })

  test("render rooms passed", () => {
    renderSideMenu();
    const rooms = screen.getAllByRole("listitem");
    expect(rooms).toHaveLength(2);
  })

  test("Add button onClick creates room", () => {
    renderSideMenu();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(sideMenuDefaultProps.createRoom).toHaveBeenCalledTimes(1);
  })
})