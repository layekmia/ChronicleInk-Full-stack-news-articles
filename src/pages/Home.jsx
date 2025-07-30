import AllPublishers from "../components/Home/AllPublisher";
import PricingPlans from "../components/Home/Plans";
import Statistics from "../components/Home/Statistics";
import TrendingSlider from "../components/Home/TrendingSlider";

export default function Home() {
  return (
    <div>
      <TrendingSlider />
      <AllPublishers/>
      <Statistics/>
      <PricingPlans/>
    </div>
  );
}
