import React from 'react' 
import ReactDOM from 'react-dom' 
import Header from './component/user/header/header';
// Tạo component App
function App() {
    return (
        <div>
            <Header/>
        </div>
    )
}

// Render component App vào #root element
ReactDOM.render(<App />, document.getElementById('root'))

