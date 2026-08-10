import os
import resend


def send_booking_notification(booking):
    resend.api_key = os.getenv("RESEND_API_KEY")

    params = {
        "from": "Astro <onboarding@resend.dev>",
        "to": [os.getenv("ADMIN_EMAIL")],
        "subject": f"New Booking - {booking['name']}",
        "html": f"""
            <h2>New Booking Request</h2>

            <p><strong>Name:</strong> {booking['name']}</p>
            <p><strong>Phone:</strong> {booking['phone']}</p>
            <p><strong>Email:</strong> {booking.get('email') or 'Not provided'}</p>
            <p><strong>Service:</strong> {booking['service_interested']}</p>
            <p><strong>Preferred Date/Time:</strong>
                {booking['preferred_datetime']}
            </p>

            <p><strong>Message:</strong></p>
            <p>{booking.get('message') or 'No message provided'}</p>
        """,
    }

    return resend.Emails.send(params)

def send_customer_confirmation(booking):
    customer_email = booking.get("email")

    if not customer_email:
        return

    resend.api_key = os.getenv("RESEND_API_KEY")

    params = {
        "from": "Astro <onboarding@resend.dev>",
        "to": [customer_email],
        "subject": "Booking Request Received - Astro",
        "html": f"""
            <h2>Booking Request Received</h2>

            <p>Dear {booking['name']},</p>

            <p>
                We have received your consultation booking request.
            </p>

            <p>
                <strong>Service:</strong>
                {booking['service_interested']}
            </p>

            <p>
                <strong>Preferred Date/Time:</strong>
                {booking['preferred_datetime']}
            </p>

            <p>
                We will contact you to confirm the appointment.
            </p>

            <p>
                Thank you for choosing Astro.
            </p>
        """,
    }

    response = resend.Emails.send(params)
    print("Customer email response:", response)
    return response