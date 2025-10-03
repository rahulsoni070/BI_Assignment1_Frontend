import { Link, useSearchParams } from "react-router-dom"
import useFetch from "../useFetch"

export default function Event() {
  const { data, loading, error } = useFetch("https://bi-assignment1-khaki.vercel.app/events")
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get("search")?.toLowerCase() || ""
  const filterType = searchParams.get("type") || ""

const filteredData = data?.filter((event) => {
  const inTitle = event.title.toLowerCase().includes(searchQuery)
  const inTags = event.eventTags?.some((tag) =>
    tag.toLowerCase().includes(searchQuery)
  )

  const matchesType =
  !filterType || filterType === "EventType" || filterType === "Both"
    ? true
    : event.eventType === filterType

  return (inTitle || inTags) && matchesType
})

  const handleTypeChange = (e) => {
    const type = e.target.value
    const params = {}
    if (searchQuery) params.search = searchQuery
    if (type && type !== "EventType") params.type = type
    setSearchParams(params)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="m-3">Meetup Events</h1>

        <select
            className="form-control"
            style={{ width: "200px" }}
            value={filterType || "EventType"}
            onChange={handleTypeChange}
            >
            <option value="EventType">Select Event Type</option>
            <option value="Online Event">Online</option>
            <option value="Offline Event">Offline</option>
            <option value="Both">Both</option>
        </select>
      </div>

      <div className="container px-3 px-md-5">
        {loading && <p className="ms-3">Loading....</p>}
        {error && <p>{error.message}</p>}
        {data?.error && <p>{data.error}</p>}
        {filteredData && !data?.error && (
          <div className="d-flex flex-wrap gap-3">
            {filteredData.map((event) => (
              <div key={event._id} className="col-md-3 mb-3">
                <Link
                  to={`/events/${event._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="position-relative">
                    <img
                      src={event.image}
                      className="card-img-top"
                      alt={event.title}
                    />
                    <span className="badge text-dark bg-light position-absolute top-0 start-0 m-2">
                      {event.eventType}
                    </span>
                  </div>
                  <div className="card-body me-3">
                    <p>{event.timing}</p>
                    <h5 className="card-title">{event.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
