import { render, screen } from '@testing-library/react';
import { Landing } from '../../src/modules/index/components/Landing';

describe('Home Page', () => {
  beforeEach(() => {
    render(<Landing />);
  });

  it('shows landing page', () => {
    const heading = screen.getByRole<HTMLHeadingElement>('heading', {
      name: 'Teknoy EMS',
    });

    const loginLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Log In',
    });

    expect(heading).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});
