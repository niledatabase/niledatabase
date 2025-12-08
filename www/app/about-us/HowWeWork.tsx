import Heading from '../_components/common/Heading';

const rows = [
  {}, // placeholder for header
  {
    title: 'Love Developers',
    content: (
      <>
        We have a maniacal focus on developer experience. We take great pride in
        ensuring developers love building their applications on Nile. Developers
        have a high bar, and we will strive to exceed their expectations every
        time. This is achieved by showing love, being honest, and taking great
        care to make the developer’s life easy.
      </>
    ),
  },
  {
    title: 'Mission Driven',
    content: (
      <>
        Our mission is to enable developers to accelerate the next billion
        modern SaaS. We want to build the best platform on the planet that helps
        us to achieve our mission. This requires intense focus, and we cannot
        allow anything else to distract us. We will make incremental progress
        every day towards our mission.
      </>
    ),
  },
  {
    title: 'First Principles Thinking',
    content: (
      <>
        To build something truly groundbreaking, you need to break every past
        assumption about a problem and try to build solutions from first
        principles. The assumptions of the past may not hold in the new world.
        We must break down problems into their fundamental truths and build upon
        them. We challenge ourselves constantly to be first principles thinkers.
      </>
    ),
  },
  {
    title: 'Strive for World-Class',
    content: (
      <>
        We want to create a company that is among the best in the world. We
        believe that excellence can only be achieved by constantly pushing
        ourselves to meet high standards in everything we do. Even the smallest
        details are given immense attention and we work tirelessly to ensure
        that they are perfect. We know what greatness looks like and we are
        relentless in our pursuit of it.
      </>
    ),
  },
  {
    title: 'Intensely Execute and Iterate',
    content: (
      <>
        Iteration velocity has a significant impact. We move fast, build
        high-quality products, and iterate rapidly on user feedback. We will
        optimize for quick feedback loops and learn. We are not done when we
        ship v0. We persist in improving the experience and the value we
        deliver. Every next version we ship will make the product significantly
        better.
      </>
    ),
  },
];

export default function HowWeWork() {
  return (
    <>
      <Heading text="How we work" />
      <div className="relative mt-8 w-full self-start">
        <div className="absolute -z-20 hidden h-full flex-row justify-between md:flex">
          <div className="relative ml-20">
            <div className="no-repeat absolute bottom-0 left-0 right-0 top-0 bg-orangeBlur bg-[size:100%] bg-[center] blur-3xl"></div>
            <div className="relative h-full bg-orangeBlurText bg-clip-text text-justify font-mono text-[12px] leading-[18px] text-transparent">
              {Text}
              {Text}
            </div>
          </div>
          <div className="w-96"></div>
          <div className="relative pr-20 xl:pl-96">
            <div className="no-repeat absolute bottom-0 left-0 right-0 top-0 bg-blueBlur bg-[size:100%] bg-[center] blur-3xl"></div>
            <div className="relative right-0 h-full bg-blueBlurText bg-clip-text text-justify font-mono text-[12px] leading-[18px] text-transparent">
              {Text}
              {Text}
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="lg:px-32">
            <div className="w-screen overflow-y-scroll rounded-md border border-gray bg-[#000] px-2.5 py-2 lg:w-auto">
              <div className="table min-w-[1000px] bg-divider">
                {rows.map((row, idx) => {
                  if (idx === 0) {
                    return (
                      <div className="table-header-group" key={row.title}>
                        <div className="gapFiller-right table-cell -translate-x-[1px] rounded-tl-[4px] border-b border-t border-gray bg-[#000] px-4 py-1">
                          <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                            ID
                          </span>
                        </div>
                        <div className="table-cell border-b border-t border-gray bg-[#000] px-4 py-1">
                          <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                            Values
                          </span>
                        </div>
                        <div className="bourder-r gapFiller-right table-cell translate-x-[1px] rounded-tr-[4px] border-b border-t border-gray bg-[#000] px-4 py-1">
                          <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                            Description
                          </span>
                        </div>
                      </div>
                    );
                  }
                  if (idx === rows.length - 1) {
                    return (
                      <div key={row.title} className="table-row flex-row">
                        <div className="gapFiller-right table-cell -translate-x-[1px] rounded-bl-[4px] border-b border-gray bg-[#000] p-4 align-top">
                          <span className="opacity-60">{idx}</span>
                        </div>
                        <div className="table-cell whitespace-nowrap border-b border-gray bg-[#000] p-4 align-top text-[20px] lg:text-[24px]">
                          <span className="opacity-80">{row.title}</span>
                        </div>
                        <div className="gapFiller-right table-cell translate-x-[1px] rounded-br-[4px] border-b border-gray bg-[#000] p-4 align-top text-[16px]">
                          <span className="opacity-60">{row.content}</span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={row.title} className="table-row flex-row">
                      <div className="gapFiller-right table-cell -translate-x-[1px] border-b border-gray bg-[#000] p-4 align-top">
                        <span className="opacity-60">{idx}</span>
                      </div>
                      <div className="table-cell whitespace-nowrap border-b border-gray bg-[#000] p-4 align-top text-[20px] lg:text-[24px]">
                        <span className="opacity-80">{row.title}</span>
                      </div>
                      <div className="gapFiller-right table-cell translate-x-[1px] border-b border-gray bg-[#000] p-4 align-top text-[16px]">
                        <span className="opacity-60">{row.content}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Text = (
  <>
    select * from tenants;
    <br />
    insert into tenants (name) VALUES ('customer1');
    <br />
    <br />
    create table employees ( tenant_id uuid, id integer, name text,
    <br />
    age integer, address text, start_date timestamp, title text,
    <br />
    CONSTRAINT FK_tenants FOREIGN KEY(tenant_id) REFERENCES
    <br />
    tenants(id), CONSTRAINT PK_employee PRIMARY KEY(tenant_id,id));
    <br />
    <br />
    set nile.tenant_id ALTER TABLE tenants ADD phone_number text, ADD address
    text;
    <br />
    <br />
    create table flights ( id integer PRIMARY KEY, name text, from_location
    text, to_location text, departure_time TIMESTAMP, arrival_time TIMESTAMP);
    <br />
    <br />
    select flights.id, flights.name, flights.from_location, airports.addressfrom
    flights, airportswhere flights.from_destination=airports.code;
    <br />
    <br />
    create table bookings ( tenant_id uuid, booking_id integer, employee_id
    text, flight_id integer, total_price float, PRIMARY
    KEY(tenant_id,booking_id));
    <br />
    SELECT tenants.name, title, completeFROM todos join tenants on tenants.id =
    todos.tenant_id;
  </>
);
