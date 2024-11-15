from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import DragDropState, User
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user

state = Blueprint('state', __name__)

@state.route('/save_state', methods=['POST'])
@login_required
def save_state():
    try:
        state_data = request.json
        user_id = current_user.id

        print(f"Saving state for user {user_id}: {state_data}")

        # Check if the user's state already exists
        existing_state = DragDropState.query.filter_by(user_id=user_id).first()

        if existing_state:
            # Update the existing state
            existing_state.drop_zone_1 = state_data.get("dropZone1")
            existing_state.drop_zone_2 = state_data.get("dropZone2")
            existing_state.drop_zone_3 = state_data.get("dropZone3")
        else:
            # Create a new state entry for the user
            new_state = DragDropState(
                user_id=user_id,
                drop_zone_1=state_data.get("dropZone1"),
                drop_zone_2=state_data.get("dropZone2"),
                drop_zone_3=state_data.get("dropZone3")
            )
            db.session.add(new_state)

        db.session.commit()
        return jsonify({"message": "State saved successfully"}), 200

    except Exception as e:
        print(f"Error saving state: {e}")
        return jsonify({"message": "Failed to save state"}), 500


@state.route('/get_state', methods=['GET'])
@login_required
def get_state():
    try:
        user_id = current_user.id
        user_state = DragDropState.query.filter_by(user_id=user_id).first()

        if user_state:
            state = {
                "dropZone1": user_state.drop_zone_1,
                "dropZone2": user_state.drop_zone_2,
                "dropZone3": user_state.drop_zone_3
            }
            print(f"Retrieved state for user {user_id}: {state}")
        else:
            # Default state if no data found
            state = {
                "dropZone1": None,
                "dropZone2": None,
                "dropZone3": None
            }
            print(f"No state found for user {user_id}. Returning default state.")

        return jsonify(state)

    except Exception as e:
        print(f"Error retrieving state: {e}")
        return jsonify({"message": "Failed to retrieve state"}), 500
