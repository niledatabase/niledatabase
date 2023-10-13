import Heading from "../_components/common/Heading";

const rows = [
  {}, // placeholder for header
  { title: "Love Developers", content: <>Content</> },
  { title: "Missing Driven", content: <>Content</> },
  { title: "First Principles Thinking", content: <>Content</> },
  { title: "Strive for Worldclass", content: <>Content</> },
  {
    title: "Intensively Execute",
    content: (
      <>
        Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content
      </>
    ),
  },
];

export default function HowWeWork() {
  return (
    <>
      <Heading text="How We Work" />
      <div className="relative">
        <div className="absolute top-0 -left-[30%] right-[50%] bottom-0 -z-10">
          <div className="bg-orangeBlur absolute top-0 left-0 right-0 bottom-0 bg-[center_left] bg-[size:100%] no-repeat blur-3xl "></div>
          <div className="relative left-[16%] w-1/2 bg-orangeBlurText bg-clip-text text-transparent font-mono text-[12px] leading-[18px]">
            {Text}
          </div>
        </div>
        <div className="absolute top-0 -right-[30%] left-[50%] bottom-0 -z-10">
          <div className="bg-blueBlur absolute top-0 left-0 right-0 bottom-0 bg-[center_left] bg-[size:100%] no-repeat blur-3xl"></div>
          <div className="relative -right-[32%] w-1/2 bg-blueBlurText bg-clip-text text-transparent font-mono text-[12px] leading-[18px]">
            {Text}
          </div>
        </div>
        <div className="py-2 px-2.5 border border-gray rounded-md bg-[#000]">
          <div className="table bg-divider">
            {rows.map((row, idx) => {
              if (idx === 0) {
                return (
                  <div className="table-header-group" key={row.title}>
                    <div className="table-cell py-1 px-4 bg-[#000] -translate-x-[1px] border-gray border-b border-t gapFiller-right rounded-tl-[4px]">
                      <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                        ID
                      </span>
                    </div>
                    <div className="table-cell py-1 px-4 bg-[#000] border-gray border-b border-t">
                      <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                        Values
                      </span>
                    </div>
                    <div className="table-cell py-1 px-4 bg-[#000] translate-x-[1px] border-gray  border-b border-t bourder-r rounded-tr-[4px] gapFiller-right">
                      <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased">
                        Description
                      </span>
                    </div>
                  </div>
                );
              }
              if (idx === rows.length - 1) {
                return (
                  <div key={row.title} className="flex-row table-row">
                    <div className="table-cell bg-[#000] -translate-x-[1px] border-gray border-b rounded-bl-[4px] gapFiller-right p-4">
                      <span className="opacity-40">{idx}</span>
                    </div>
                    <div className="table-cell bg-[#000] border-gray border-b text-[24px] whitespace-nowrap p-4">
                      <span className="opacity-50">{row.title}</span>
                    </div>
                    <div className="table-cell bg-[#000] translate-x-[1px] border-gray border-b gapFiller-right rounded-br-[4px] p-4">
                      <span className="opacity-50">{row.content}</span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={row.title} className="flex-row table-row">
                  <div className="table-cell bg-[#000] -translate-x-[1px] border-gray gapFiller-right border-b p-4">
                    <span className="opacity-40">{idx}</span>
                  </div>
                  <div className="table-cell bg-[#000] border-gray border-b text-[24px] whitespace-nowrap p-4">
                    <span className={`opacity-${100 - 10 * idx}`}>
                      {row.title}
                    </span>
                  </div>
                  <div className="table-cell bg-[#000] translate-x-[1px] border-gray border-b gapFiller-right p-4">
                    <span className={`opacity-${100 - 10 * idx}`}>
                      {row.content}
                    </span>
                  </div>
                </div>
              );
            })}
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
