import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import SmartRecommendations from 'components/ui/SmartRecommendations';
import { generateWhatsAppUrl, generateEmailUrl } from 'utils/helpers';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock pet data, would come from API
  const mockPet = {
    id: id,
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years old",
    location: "Madrid",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWJUTsRE9lWxSqEAJcpsiLV_Gx1-UkW86dKnqY5YCWFTujyMxdyRnpE0erzPJ30BAolypiScljtYFuiDoG_VTgEktiit7nWhdpRw69hg6Ktp-pg4fLVjs51sOqeVSbvtze4j26ZiPyermX5zQj5NBeQH9-LAQRVw3sG-3A6noh3pVm3ODBRbExWBx31Q8qrnHud9wTCUKFgkLjf6yI8mpmRSMeVXz6PNhunmOAwXl_vOGcaV4BqCYNX7MdT9bUDmoaaR38x9jTVyE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5l4L3Ckh4jpoJ8Sg8GuogS_uloj7bxAYEXEew1noSOZLz_pldugeRMCQ-AJjfvSr5oXMQg-ljg6XmJCjMavPawQUylu-a4pQbfGOwCSLYYW9_laoQp10w2LDNvB6aLDaoPEEPjbiCULBQDR3iwq-UfY27oLPFezjoNdw-sVTmfLR6ouUna9_OgBBT_geURkGvK6yKv-BO1JH9luK-hf1yMqxXbbByOs79Om1hneGUKh9288KDFSd6vte7Up0QoMeI6wXBxN61q2c",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1QFRD0NnrfOcSQ_-557T0Aej58p4tV0E8Ryqu1-NZOlCBqFjSqbWTOfpkwD7eLduW4UYdPkcYFye4UVvlE_la8Ay48I8QAsOVqadyMB_k5wH-sKnqfxoZN1QGHydlxs1IrZSSs20HqevWFTSrGAAiOCM1pToFSMzaGl9L2Hxb1hM-zrCK8Re_GHuXvrSqSreuUGQTSWVYFIYkEVeIxfBdgkcGbYJzgJKqDsZywUPVplmaLIuaHtW7M-OYTgJfzgnjug3MszDiZy8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZFL6UXENjkr_nQIZBP94usO8CZ1qTcElWiK5hHg94Jsukaul2jFov920l7Oe_0lE2xg5YjCT1Tu7qhEC-k_Z3cd7eBfSw1C4pSJ_LZfRY41udVtZVz1Caymor9sLFaqTNIJ1uk6hm1LEIoaVMtcR7PMvO6Fh5Va8vc16xR_MLjXEV87j8RlbSqEgBaIdj5a1kynI5_rewiPiGWQzCHsfYHAM7mMoqh1T-T-6X7okbhtvrSdp4BgcnaEJGPGOzJxKtD4y5t0HnomU"
    ],
    tags: ["Vaccinated", "Friendly", "House-trained"],
    description: "Buddy is a playful and affectionate Golden Retriever who loves to be around people. He was found wandering alone and is now looking for a loving forever home. Buddy is great with kids and other dogs, making him an ideal family pet. He enjoys long walks and playing fetch in the park. He's also house-trained and knows basic commands. Buddy is vaccinated and ready to join his new family.",
    shelterInfo: {
      name: "Animal Shelter Madrid",
      location: "Madrid, Spain",
      phone: "+34600123456",
      email: "shelter.madrid@example.com",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLEm7S-Z0SWGtTeisisH1bXIOHf9H5UZoD62-gbCTfUrD3QCcm6eWYHPYdaPO9PKxoNXCE2KDBCQJwEp3ITLfpCC6vU_kCRnftoqkL-V5ba1iHvDJh2bmoaLu78oi1PlHiA77jm8oaz1NNIPjxdvaeoKnf7Z3LnfFIEnztUDepG78WZrwrsOPtex35-9bLwRVFpzvnWH35owGuCcvXeYsE15iWVuM5dy1gedDv8ZiVQi3ahcboidsFyQOktQoMf-dHRVG7hVey_go"
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setPet(mockPet);
      setIsLoading(false);
    };
    fetchPet();
  }, [id]);

  const handleWhatsApp = () => {
    if (!pet) return;
    const message = `Hi, I'm interested in adopting ${pet.name}.`;
    const url = generateWhatsAppUrl(pet.shelterInfo.phone, message);
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    if (!pet) return;
    const subject = `Adoption Inquiry: ${pet.name}`;
    const body = `I would like to know more about the adoption process for ${pet.name}.`;
    const url = generateEmailUrl(pet.shelterInfo.email, subject, body);
    window.location.href = url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner text="Loading pet details..." />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Pet not found.</p>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdaptiveHeader />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <a onClick={() => navigate('/')} className="text-[#607d85] text-base font-medium leading-normal cursor-pointer">Home</a>
              <span className="text-[#607d85] text-base font-medium leading-normal">/</span>
              <a onClick={() => navigate('/')} className="text-[#607d85] text-base font-medium leading-normal cursor-pointer">Pets</a>
              <span className="text-[#607d85] text-base font-medium leading-normal">/</span>
              <span className="text-[#111618] text-base font-medium leading-normal">{pet.name}</span>
            </div>
            <div className="flex w-full grow bg-gray-50 @container p-4">
              <div className="w-full gap-1 overflow-hidden bg-gray-50 @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{ backgroundImage: `url("${pet.images[currentImageIndex]}")` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {pet.images.map((image, index) => (
                <div key={index} className="flex flex-col gap-3" onClick={() => setCurrentImageIndex(index)}>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg cursor-pointer"
                    style={{ backgroundImage: `url("${image}")`, border: currentImageIndex === index ? '2px solid #4792a7' : '' }}
                  ></div>
                </div>
              ))}
            </div>
            <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">{pet.name}</h2>
            <p className="text-[#607d85] text-sm font-normal leading-normal pb-3 pt-1 px-4">{pet.breed} · {pet.age} · {pet.location}</p>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {pet.tags.map(tag => (
                <div key={tag} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#eaeff0] pl-4 pr-4">
                  <p className="text-[#111618] text-sm font-medium leading-normal">{tag}</p>
                </div>
              ))}
            </div>
            <p className="text-[#111618] text-base font-normal leading-normal pb-3 pt-1 px-4">
              {pet.description}
            </p>
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">SmartRecommendations</h2>
            <SmartRecommendations currentItem={pet} type="pet" />
          </div>
          <div className="layout-content-container flex flex-col w-[360px]">
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#111618] text-base font-bold leading-tight">{pet.shelterInfo.name}</p>
                    <p className="text-[#607d85] text-sm font-normal leading-normal">{pet.shelterInfo.location}</p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#eaeff0] text-[#111618] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">View Shelter</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{ backgroundImage: `url("${pet.shelterInfo.image}")` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                <button onClick={handleWhatsApp} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#4792a7] text-gray-50 text-sm font-bold leading-normal tracking-[0.015em] w-full">
                  <span className="truncate">WhatsApp</span>
                </button>
                <button onClick={handleEmail} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#eaeff0] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] w-full">
                  <span className="truncate">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;