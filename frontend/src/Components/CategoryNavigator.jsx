import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { NavLink } from 'react-router-dom';
 
function CategoryNavigator({ category, redirecturl, data }) {
 
  return (
    <div className="my-5  flex flex-col gap-3 max-w-7xl mx-auto ">
      <h2 className="text-2xl font-medium p-3">
        Explore Latest Movies in Indore by {category}
      </h2>
      <div className=''>
        <Swiper slidesPerView={'auto'} spaceBetween={12}>
          {data?.map((v, i) => {
            return (
              <SwiperSlide className="w-auto! p-4"
              >
                <NavLink
                  to={`/movies/list/${redirecturl}/${v}`}
                  className="border px-3 py-2  rounded-xl "
                >
                  {v} Movies
                </NavLink>
              </SwiperSlide>
            )
          })}
        </Swiper>
        </div>
      </div>
   
  );
}
 
export default CategoryNavigator;
 
