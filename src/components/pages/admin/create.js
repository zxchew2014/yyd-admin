import React from "react";
import PropTypes from "prop-types";
import AddAdminForm from "../../forms/admins/add-admin";

class AddAdminPage extends React.Component {
    onNext = () => {
        const {history} = this.props;
        history.push(`/admin`);
    };

    render() {
        return (
            <div className="add-admin-container">
                <AddAdminForm key="add-admin-form" onNext={this.onNext}/>
            </div>
        );
    }
}

AddAdminPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default AddAdminPage;
