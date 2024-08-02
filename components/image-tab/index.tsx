'use client'
import { fetchImages } from "@/redux/features/images/imagesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ImageTab = () => {
  const { images } = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      <p className="mt-12">عکس شخصی</p>
      <hr className="mb-12 mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="carousel carousel-center rounded-box">
      {images.length === 0 ? (
            <p className="text-center mt-4 text-orange-500">
              هیچ عکسی وجود ندارد
            </p>
          ) : (
            images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-48 w-48 flex justify-center items-center">
                  <img
                    src={image}
                    alt='car'
                    className="h-full w-full object-cover"
                  />
                </div>
            </div>
            ))
          )}
      </div>

      <p className="mt-12">عکس دوستان</p>
      <hr className="mb-12 mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="carousel carousel-center rounded-box">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
            alt="Pizza"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTab;
