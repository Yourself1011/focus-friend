import * as React from "react";
import Svg, { Circle, Rect, Path } from 'react-native-svg';
const SvgStats = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 490.4 490.4"
    {...props}
  >
    <Path
      fill="#454cde"
      d="M17.2 251.55c-9.5 0-17.2 7.7-17.2 17.1v179.7c0 9.5 7.7 17.2 17.2 17.2h113c9.5 0 17.1-7.7 17.1-17.2v-179.7c0-9.5-7.7-17.1-17.1-17.1zm95.8 179.7H34.3v-145.4H113zM490.4 448.45v-283.7c0-9.5-7.7-17.2-17.2-17.2h-113c-9.5 0-17.2 7.7-17.2 17.2v283.6c0 9.5 7.7 17.2 17.2 17.2h113c9.5 0 17.2-7.7 17.2-17.1m-34.3-17.2h-78.7v-249.3h78.7zM301.7 465.55c9.5 0 17.1-7.7 17.1-17.2V42.05c0-9.5-7.7-17.2-17.1-17.2h-113c-9.5 0-17.2 7.7-17.2 17.2v406.3c0 9.5 7.7 17.2 17.2 17.2zm-95.8-406.3h78.7v372h-78.7z"
    />
    <Rect x="30.3" y="280.85" width="90.7" height="170.4" fill="#454cde" />
    <Rect x="372.4" y="165.75" width="110.7" height="270.3" fill="#454cde" />
    <Rect x="180.7" y="42.05" width="110" height="392" fill="#454cde" />
  </Svg>
);
export default SvgStats;