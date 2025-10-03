import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { FaMapMarkerAlt, FaClock, FaRupeeSign } from "react-icons/fa";

export default function EventDetails(){
    const { eventId } = useParams()

    console.log(eventId)
    const { data, loading, error } = useFetch(`https://bi-assignment1-psi.vercel.app/events/${eventId}`)

    if (loading) {
        return <p className="text-center">Loading......</p>
    }
    if(error) {
        return <p>{error.message}</p>
    }
    if(!data) {
        return null
    }

    return(
        <div className="container bg-body-tertiary">
        <Header />
        <hr />
        <div className="container px-3 px-md-5">
        <h1>{data.title}</h1>
        <p>Hosted By: <b>{data.host}</b></p>
        <div className="row">
            <div className="col-md-6">
            <img src={data.image} alt={data.title} className="img-fluid" />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-start">
            <p><FaClock className="me-2" /> {data.timing}</p>
            <p><FaMapMarkerAlt className="me-2" /> {data.address}</p>
            <p><FaRupeeSign className="me-2" /> {data.price}</p>
            <h1>Speakers: </h1>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {data.speakers.map((speaker) => (
                <div key={speaker._id} style={{ textAlign: "center" }}>
                <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%", 
                    objectFit: "cover",
                    }}
                />
                <p><b>{speaker.name}</b></p>
                </div>
            ))}
        </div>
        </div>
        </div>

        <h4 className="py-3">Details</h4>
        <p>{data.details}</p>
        <h4>Additional Information:</h4>
        <p>{data.additionalInfo.join(", ")}</p>
        <h4>Event Tags:</h4>
        <p className="btn btn-danger">{data.eventTags.join(", ")}</p>
        </div>
        </div>
    )
}