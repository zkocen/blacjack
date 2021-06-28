import React  from 'react';
import './_App.scss';
import Interactions from './interactions/interactions.component';

const App: React.FunctionComponent = (): JSX.Element => {
    return (
        <div className="App">
            <Interactions />
        </div>
    );
};

export default App;
