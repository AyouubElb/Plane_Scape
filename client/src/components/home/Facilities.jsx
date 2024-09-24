import { services } from "../../constants";

const Facilities = () => {
  return (
    <div class="flex flex-col gap-5">
      {services.map((service) => (
        <div
          key={service.id}
          className="h-[155px] bg-cover bg-center flex flex-col justify-end rounded-xl p-4 cursor-pointer"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <img src={service.icon} alt={service.title} className="w-[25px]" />
          <h3 className="text-white text-xl font-roboto font-medium uppercase">
            {service.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
