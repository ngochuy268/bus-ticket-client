import PacmanLoader from "react-spinners/RingLoader";

const Loading = ({loading}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: '#020d18'
        }}>
            <PacmanLoader color="#FF0000" size={70} loading={loading} />
        </div>
    )
}

export default Loading ;