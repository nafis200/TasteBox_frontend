import MealCard from "@/components/modules/home/Allmeals/MealCard";
import Banner from "@/components/modules/home/banner/BannerPage";
import Menu from "@/components/modules/home/managemenu/Menu";
import MealFaq from "@/components/modules/home/MealFAq/MealFaq";
import ShoppingSection from "@/components/modules/ShoppingSections/ShoppingSection";

const HomePage = () => {
  return (
    <div>
      <div className="space-y-16">
  <Banner />
  <MealCard />
  <Menu />
  <MealFaq />
  <ShoppingSection />
</div>

    </div>
  );
};

export default HomePage;
