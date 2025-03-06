
import UpdateMeal from '@/components/modules/AdminDashboard/UpdateMeal/UpdateMeal';
import { getAllProducts } from '@/services/MealMenu';
import React from 'react';

const UpdateMealPage =  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await getAllProducts(page, limit);

    const {result,meta} = results?.data

   
    return (
        <div>
            <UpdateMeal products={result} meta={meta}/>
        </div>
    );
};

export default UpdateMealPage;