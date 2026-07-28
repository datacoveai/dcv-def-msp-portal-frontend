# This is our Streamlit frontend for the DataCove Portal
import streamlit as st
import requests

# Base URL of our FastAPI backend
API_URL = "http://127.0.0.1:8000"

st.set_page_config(page_title="DataCove Portal", layout="wide")

st.title("🛡️ DataCove Partner Portal")

# Left sidebar navigation - matches Section 7 requirements
page = st.sidebar.radio(
    "Navigation",
    ["Manage Accounts", "Users", "Services & Contracts", "Audits","Usage"]
)

# ---------------- MANAGE ACCOUNTS PAGE ----------------
if page == "Manage Accounts":
    st.header("Manage Accounts")
    
    # Get list of MSPs for dropdown
    msp_response = requests.get(f"{API_URL}/accounts/msps")
    msps = msp_response.json()
    
    if msps:
        # Create a dictionary mapping display name to account ID
        msp_options = {f"{m['name']} ({m['email']})": m['_id'] for m in msps}

        options_list = ["Select an MSP..."] + list(msp_options.keys())
        selected_msp_name = st.selectbox("Select MSP", options_list)

        if selected_msp_name != "Select an MSP...":
            account_id = msp_options[selected_msp_name]
        
        # Fetch and display the tree using selected account_id
            response = requests.get(f"{API_URL}/accounts/{account_id}/tree")
            if response.status_code == 200:
               data = response.json()
               st.subheader(f"📁 {data['name']} ({data['account_type']})")
               st.write(f"Email: {data['email']}")
               st.write(f"Status: {data['status']}")
            
               if data.get("children"):
                   st.write("**Client Organizations:**")
                   for child in data["children"]:
                       st.write(f"- {child['name']} ({child['account_type']}) - {child['email']}")
    else:
        st.info("No MSP accounts found. Create one first.")

# ---------------- USERS PAGE ----------------
elif page == "Users":
    st.header("Users")
    
    all_accounts_response = requests.get(f"{API_URL}/accounts/all")
    all_accounts = all_accounts_response.json()
    
    account_options = {f"{a['name']} ({a['account_type']})": a['_id'] for a in all_accounts}
    options_list = ["Select an account..."] + list(account_options.keys())
    selected_account_name = st.selectbox("Select Account", options_list)

    if selected_account_name != "Select an account...":
        account_id = account_options[selected_account_name]
    
        response = requests.get(f"{API_URL}/users/{account_id}")
        if response.status_code == 200:
           users = response.json()
           if users:
              for u in users:
                st.write(f"📧 {u['email']} — Role: {u['role']} — Status: {u['status']}")
           else:
              st.info("No users found for this account")

# ---------------- SERVICES & CONTRACTS PAGE ----------------
elif page == "Services & Contracts":
    st.header("Services & Contracts")
    
    all_accounts_response = requests.get(f"{API_URL}/accounts/all")
    all_accounts = all_accounts_response.json()
    
    account_options = {f"{a['name']} ({a['account_type']})": a['_id'] for a in all_accounts}
    options_list = ["Select an account..."] + list(account_options.keys())
    selected_account_name = st.selectbox("Select Account", options_list)

    if selected_account_name != "Select an account...":
        account_id = account_options[selected_account_name]
    
        response = requests.get(f"{API_URL}/seats/{account_id}")
        if response.status_code == 200:
            seats = response.json()
            if seats:
               for s in seats:
                  st.write(f"Allocated: {s['allocated_seats']} | Activated: {s['activated_seats']} | Status: {s['status']}")
            else:
               st.info("No seat data found")

# ---------------- AUDITS PAGE ----------------
elif page == "Audits":
    st.header("Audit Log")
    
    all_accounts_response = requests.get(f"{API_URL}/accounts/all")
    all_accounts = all_accounts_response.json()
    
    account_options = {f"{a['name']} ({a['account_type']})": a['_id'] for a in all_accounts}
    options_list = ["Select an account..."] + list(account_options.keys())
    selected_account_name = st.selectbox("Select Account", options_list)

    if selected_account_name != "Select an account...":
        account_id = account_options[selected_account_name]
    
        response = requests.get(f"{API_URL}/audits/{account_id}")
        if response.status_code == 200:
            logs = response.json()
            if logs:
               for log in logs:
                  st.write(f"🕒 {log['timestamp']} — **{log['action']}** by {log['performed_by']}")
            else:
                st.info("No audit logs found")

# ---------------- USAGE PAGE ----------------
elif page == "Usage":
    st.header("Usage")
    
    all_accounts_response = requests.get(f"{API_URL}/accounts/all")
    all_accounts = all_accounts_response.json()
    
    account_options = {f"{a['name']} ({a['account_type']})": a['_id'] for a in all_accounts}
    options_list = ["Select an account..."] + list(account_options.keys())
    selected_account_name = st.selectbox("Select Account", options_list)
    
    if selected_account_name != "Select an account...":
        account_id = account_options[selected_account_name]
    
        response = requests.get(f"{API_URL}/usage/{account_id}")
        if response.status_code == 200:
            data = response.json()
            st.metric("Seats Allocated", data["allocated"])
            st.metric("Seats Activated", data["activated"])
            st.progress(data["usage_percent"] / 100)
            st.write(f"Usage: {data['usage_percent']}%")