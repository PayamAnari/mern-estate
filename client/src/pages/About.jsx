import AboutImage from '../assets/about1.png';


export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-6 items-center'>
        <div className=''>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About <span className='text-blue-600'>Payam</span> Estate</h1>
      <p className='mb-4 text-slate-700'>Payam Estates stands out as a premier real estate agency, specializing in facilitating property transactions with a focus on buying, selling, and renting in sought-after neighborhoods. Our seasoned team of agents is unwaveringly devoted to delivering outstanding service, ensuring that the intricate processes of buying and selling unfold seamlessly.</p>
      <p className='mb-4 text-slate-700'>
      At the core of our mission is the commitment to help clients realize their real estate aspirations. We offer expert advice, personalized service, and an in-depth understanding of the local market dynamics. Whether you're in the market to purchase, sell, or rent a property, we are your steadfast partner, guiding you through each stage of the journey.      </p>
      <p className='mb-4 text-slate-700'>Backed by a team of agents with extensive experience and knowledge in the real estate industry, we pledge to provide the highest level of service to our clients. We firmly believe that the process of buying or selling a property should be an exhilarating and fulfilling experience. Our dedication is centered on transforming this belief into a reality for each and every one of our valued clients.</p>
    </div>
    <div className='overflow-hidden'>
     <img className='w-full h-full object-cover rounded-2xl '
      src={AboutImage} alt='About'
      />
    </div>
    </div>
    </div>
  )
}