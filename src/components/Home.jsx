
const Home = () => {
    return <>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{marginTop: "55px"}}>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="/images/allblogs.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>
    </>
}

export default Home;