import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PREDEFINED_SKILLS = [
  "React",
  "JavaScript",
  "Python",
  "Java",
  "SQL",
  "HTML",
  "CSS",
  "Node.js",
  "Angular",
  "Vue.js",
  "C++",
  "C#",
  "Go",
  "Ruby",
  "PHP",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "TensorFlow",
  "PyTorch",
  "Swift",
  "Kotlin",
  "Spring Boot",
  "Django",
  "Flask",
  "Development",
  "Computer Skills",
  "Communication",
  "Data Analysis",
  "Project Management",
  "Development",
  "Computer Skills",
  "Communication",
  "Data Analysis",
  "Project Management",
  "Problem Solving",
  "Teaching",
  "Research",
  "Leadership",
  "Teamwork",
  "Microsoft Office",
  "Programming",
  "Web Development",
  "Digital Marketing",
  "Content Writing",
  "Social Media",
  "Customer Service",
  "Sales",
  "Accounting",
  "Finance",
  "Data Entry",
  "Graphic Design",
  "Photography",
  "Video Editing",
  "Public Speaking",
  "Event Management",
  "Time Management",
  "Critical Thinking",
  "Creativity",
  "Adaptability",
  "First Aid",
  "Basic Medical Knowledge",
  "Farming",
  "Field Work",
  "Training",
  "Cyber Security",
  "Technical Skills",
  "Hindi",
  "English",
  "Environmental Science",
  "Social Work",
  "Coordination",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    education: "",
    sector: "",
    location: "",
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills.join(", ") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill in all required fields");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password should be at least 6 characters");
    }

    try {
      setLoading(true);
      const { confirmPassword, sector, location, ...userData } = formData;
      const mappedUserData = {
        ...userData,
        area_of_interest: sector,
        location_preference: location,
      };
      await signup(mappedUserData);
      navigate("/recommendations");
    } catch (err) {
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Your Skills
              </label>
              <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {PREDEFINED_SKILLS.slice(
                    0,
                    showAllSkills ? PREDEFINED_SKILLS.length : 12
                  ).map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="mt-2 text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  {showAllSkills
                    ? "Show Less"
                    : `Show All (${PREDEFINED_SKILLS.length} skills)`}
                </button>
              </div>
              {selectedSkills.length > 0 && (
                <div className="text-sm text-gray-600">
                  Selected: {selectedSkills.join(", ")}
                </div>
              )}
            </div>
            <select
              name="education"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">Select Education Level</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
            <select
              name="sector"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.sector}
              onChange={handleChange}
            >
              <option value="">Select Sector Interest</option>
              <option value="Agriculture">Agriculture</option>
              <option value="IT">Information Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Rural Development">Rural Development</option>
              <option value="Environment">Environment</option>
              <option value="Skill Development">Skill Development</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Tourism">Tourism</option>
              <option value="Media">Media & Communication</option>
            </select>
            <input
              name="location"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Preferred Location (e.g., Delhi, Mumbai)"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
