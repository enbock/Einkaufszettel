import HelloWorld from './HelloWorld';
import {render, RenderResult} from '@testing-library/react';

describe(HelloWorld, function () {
  it('should output "Hello World"', function () {
    const result:RenderResult = render(<HelloWorld />);
    expect(result.container.innerHTML).toContain('Hello World!');
  });
})
