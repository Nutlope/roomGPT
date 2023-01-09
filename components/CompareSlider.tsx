import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export const CompareSlider = ({ original, restored }: { original: string; restored: string }) => {
  return <ReactCompareSlider itemOne={<ReactCompareSliderImage src={original} alt="original photo" />} itemTwo={<ReactCompareSliderImage src={restored} alt="restored photo" />} portrait className="flex w-[475px] mt-5" />;
};
