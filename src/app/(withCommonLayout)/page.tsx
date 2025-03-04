import MealCard from "@/components/modules/home/Allmeals/MealCard";
import Banner from "@/components/modules/home/banner/BannerPage";
import Menu from "@/components/modules/home/managemenu/Menu";
import MealFaq from "@/components/modules/home/MealFAq/MealFaq";

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <MealCard/>
      <Menu/>
      <MealFaq/>
    </div>
  );
};

export default HomePage;
