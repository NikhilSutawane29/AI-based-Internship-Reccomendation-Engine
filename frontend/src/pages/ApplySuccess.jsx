import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const ApplySuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { internship, applicationData } = location.state || {};

  if (!internship) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Application not found</h2>
          <button
            onClick={() => navigate('/recommendations')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-green-50 px-6 py-8 text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-green-900">
            Application Submitted Successfully!
          </h1>
          <p className="mt-2 text-green-700">
            Your application has been received and is being processed.
          </p>
        </div>

        {/* Application Details */}
        <div className="px-6 py-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Application Summary
            </h2>
            
            {/* Internship Details */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 text-lg">
                {internship.title}
              </h3>
              <p className="text-blue-700 mt-1">
                {internship.company} • {internship.location}
              </p>
              {internship.stipend && (
                <p className="text-green-600 font-medium mt-1">
                  {internship.stipend} • {internship.duration}
                </p>
              )}
            </div>

            {/* Submitted Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Name:</span> {applicationData?.fullName}</p>
                  <p><span className="font-medium">Email:</span> {applicationData?.email}</p>
                  {applicationData?.phone && (
                    <p><span className="font-medium">Phone:</span> {applicationData.phone}</p>
                  )}
                  {applicationData?.education && (
                    <p><span className="font-medium">Education:</span> {applicationData.education}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Application Details</h4>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Applied on:</span> {new Date().toLocaleDateString()}</p>
                  <p><span className="font-medium">Resume:</span> {applicationData?.resume ? 'Uploaded' : 'Not provided'}</p>
                  <p><span className="font-medium">Cover Letter:</span> {applicationData?.coverLetter ? 'Provided' : 'Not provided'}</p>
                </div>
              </div>
            </div>

            {applicationData?.skills && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900">Skills</h4>
                <p className="mt-1 text-sm text-gray-600">{applicationData.skills}</p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">1</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    Your application will be reviewed by the hiring team within 3-5 business days.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">2</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    If shortlisted, you'll receive an email with further instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">3</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    You can track your application status in your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
            >
              View My Applications
            </button>
            <button
              onClick={() => navigate('/recommendations')}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-center"
            >
              Browse More Internships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplySuccess;