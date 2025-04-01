import React from 'react'

const CollectorQA = () => {

    const faqs = [
        {
          question: "Where is my order?",
          answer:
            "Nulla non sollicitudin. Morbi sit amet laoreet ipsum, vel pretium mi.",
        },
        {
          question: "How can I return an item purchased online?",
          answer:
            "Morbi varius, tellus in accumsan blandit, elit ligula eleifend velit, luctus mattis ante nulla condimentum nulla.",
        },
        {
          question: "Can I cancel or change my order?",
          answer:
            "Morbi sit amet laoreet ipsum, vel pretium mi. Morbi varius, tellus in accumsan blandit.",
        },
        {
          question: "I have a promotional or discount code?",
          answer:
            "Luctus mattis ante nulla condimentum nulla. Morbi varius, tellus in accumsan blandit.",
        },
        {
          question: "What are the delivery types you use?",
          answer:
            "Morbi sit amet laoreet ipsum, vel pretium mi. Morbi varius, tellus in accumsan blandit.",
        },
        {
          question: "How can I pay for my purchases?",
          answer:
            "Nulla non sollicitudin. Morbi sit amet laoreet ipsum, vel pretium mi.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "Luctus mattis ante nulla condimentum nulla. Morbi varius, tellus in accumsan blandit.",
        },
      ];
  return (
    <div>
          <div className="gap-6 flex flex-col mx-auto px-5 xl:gap-[50px] max-w-[950px] mt-[70px] lg:mt-[98px]">
        <div className="flex-1 mb-[40px] text-center">
          <h2 className="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-[55px] text-gray-900 mb-5 md:mb-[30px] max-w-[725px]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mx-auto mb-[10px] md:w-[55ch]">
            Feeling inquisitive? Have a read through some of our FAQs or contact
            our supporters for help.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-[35px]">
          {["People first", "Agile approach", "New mindset"].map(
            (item, index) => (
              <div key={index} className="mb-[30px] lg:mb-0">
                <div className="flex items-center mb-[17px]">
                  <img
                    className="mr-[9px]"
                    src="assets/images/icons/icon-leaf.svg"
                    alt="leaf icon"
                  />
                  <h4 className="text-lg font-bold font-chivo">{item}</h4>
                </div>
                <p className="text-gray-600">
                  The latest design trends meet hand-crafted templates.
                </p>
              </div>
            )
          )}
        </div>
        <div className="flex-[1.5]">
          {faqs.map((faq, index) => (
            <details key={index} className="relative accordion-item mb-5">
              <summary className="flex justify-between py-5 items-center gap-5 px-[30px] cursor-pointer bg-c-green-100/20">
                <h4 className="font-bold font-chivo text-gray-600 text-[14px] xl:text-2xl">
                  {faq.question}
                </h4>
              </summary>
              <p className="text-gray-600 font-medium font-chivo mt-[20px] ml-[20px] text-[10px] xl:text-lg">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="flex items-center justify-center mb-[50px]">
          <a
            href="about-2.html#"
            className="flex items-center transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-full bg-green-900 text-white hover:bg-gray-900 mr-[22px]"
          >
            <span className="text-lg font-chivo font-semibold">
              Join Our Team
            </span>
            <img
              className="ml-[7px] w-[12px]"
              src="assets/images/icons/icon-right.svg"
              alt="arrow right icon"
            />
          </a>
          <a
            href="index.html"
            className="text-lg font-chivo font-bold text-gray-900 flex items-center gap-[5px]"
          >
            Support Center
          </a>
        </div>
      </div>
    
    
    </div>
  )
}

export default CollectorQA