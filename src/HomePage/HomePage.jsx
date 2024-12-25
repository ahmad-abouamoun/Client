import "./HomePage.css";

const HomePage = () => {
    return (
        <div>
            <nav class="navbar">
                <h3>Website Name</h3>

                <ul>
                    <li>
                        <span>Home</span>
                    </li>
                    <li>
                        <span>About Us</span>
                    </li>
                    <li>
                        <span>Profile</span>
                    </li>
                </ul>

                <button class="primary-bg">Login</button>
            </nav>
        </div>
    );
};
export default HomePage;
