import * as React from "react";
import Svg, { Circle, Rect, Path } from 'react-native-svg';
const SvgWave = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    className="wave_svg__icon wave_svg__glyph"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M16.5 14a4.06 4.06 0 0 1-2.92-1.25 2 2 0 0 0-3.17 0 4 4 0 0 1-5.83 0A2.1 2.1 0 0 0 3 12a1 1 0 0 1 0-2 4 4 0 0 1 2.91 1.25 2 2 0 0 0 3.17 0 4 4 0 0 1 5.83 0 2 2 0 0 0 3.17 0A4.06 4.06 0 0 1 21 10a1 1 0 0 1 0 2 2.12 2.12 0 0 0-1.59.75A4 4 0 0 1 16.5 14M16.5 20a4.06 4.06 0 0 1-2.92-1.25 2 2 0 0 0-3.17 0 4 4 0 0 1-5.83 0A2.1 2.1 0 0 0 3 18a1 1 0 0 1 0-2 4 4 0 0 1 2.91 1.25 2 2 0 0 0 3.17 0 4 4 0 0 1 5.83 0 2 2 0 0 0 3.17 0A4.06 4.06 0 0 1 21 16a1 1 0 0 1 0 2 2.12 2.12 0 0 0-1.59.75A4 4 0 0 1 16.5 20m0-12a4.06 4.06 0 0 1-2.92-1.25 2 2 0 0 0-3.17 0 4 4 0 0 1-5.83 0A2.1 2.1 0 0 0 3 6a1 1 0 0 1 0-2 4 4 0 0 1 2.91 1.25 2 2 0 0 0 3.17 0 4 4 0 0 1 5.83 0 2 2 0 0 0 3.17 0A4.06 4.06 0 0 1 21 4a1 1 0 0 1 0 2 2.12 2.12 0 0 0-1.59.75A4 4 0 0 1 16.5 8" />
  </Svg>
);
export default SvgWave;