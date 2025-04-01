import React from 'react'

const Benifits = () => {
  return (
    <div>
          <div className="px-3 md:px-9 xl:px-0 mt-16 text-center mx-auto max-w-4xl">
        <span className="font-chivo inline-block bg-c-green-100/20 text-c-green-900 py-3 px-7 rounded-full text-sm leading-4 mb-4">
          How It Works?
        </span>
        <div className="text-center mb-20">
          <h2 className="font-bold font-chivo mx-auto text-2xl md:text-4xl lg:text-5xl text-gray-900 mb-5 md:mb-8 max-w-2xl">
            Benefits of Becoming a Collector{" "}
          </h2>
        </div>
        <div className="min-w-full flex flex-col gap-5 items-center justify-center relative md:flex-wrap md:flex-row lg:gap-[30px] xl:gap-[110px]">
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-dharma-wheel.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Earn Money{" "}
            </h4>
            <p className="text-md text-gray-500">
              Get paid for each collection and build a stable income.{" "}
            </p>
            <img
              className="hidden absolute right-0 lg:block top-1/2 translate-x-[30px] z-[-1] xl:translate-x-full xl:right-[-15px]"
              src="assets/images/icons/icon-arrow-1.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-wave.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Flexible Hours
            </h4>
            <p className="text-text text-gray-500">
              Choose your working hours and pick up assignments that fit your
              schedule.{" "}
            </p>
            <img
              className="hidden absolute right-0 lg:block top-1/2 translate-x-[30px] z-[-1] xl:translate-x-full xl:right-[-15px]"
              src="assets/images/icons/icon-arrow-2.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-headphones.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Sustainability
            </h4>
            <p className="text-text text-gray-500">
              Help reduce waste by collecting and ensuring responsible
              recycling.
            </p>
            <img
              className="hidden absolute right-0 top-full lg:block translate-x-[-60px] z-[-1] xl:translate-y-[30px]"
              src="assets/images/icons/icon-arrow-3.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative bg-c-green-100/20  md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px] lg:order-1">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-trees.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Work Assignments
            </h4>
            <p className="text-text text-gray-500">
              Receive scheduled pickups near your location for a steady
              workflow.{" "}
            </p>
            <img
              className="hidden absolute left-0 lg:block top-1/2 translate-x-[-30px] z-[-1] xl:-translate-x-full xl:left-[-15px]"
              src="assets/images/icons/icon-arrow-4.svg"
              alt="direction arrow"
            />
          </div>
          <div className="rounded-2xl p-[30px] md:py-[20px] md:px-[53px] self-stretch relative  bg-c-green-100/20 md:w-[calc(50%-20px)] lg:w-[calc(33.33%-30px)] xl:w-[calc(33.33%-75px)] transition-all duration-300 hover:translate-y-[-3px]">
            <div className="bg-white rounded-full grid place-items-center mx-auto mb-8 w-[80px] h-[80px]">
              <img
                className="max-w-[36px]"
                src="assets/images/icons/icon-flower.svg"
                alt="icon"
              />
            </div>
            <h4 className="font-bold font-chivo text-[14px] xl:text-lg mb-[15px]">
              Complete
            </h4>
            <p className="text-text text-gray-500">After-release Support</p>
          </div>
        </div>
      </div>
    
    
    </div>
  )
}

export default Benifits