import Layout from "components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ResourceForm from "components/ResourceForm";

const ResourceCreate = () => {
  const router = useRouter();

  // post:送信元URL,data  .then:成功時の処理
  const createResource = (formData) => {
    axios
      .post("/api/resources", formData)
      .then((_) => router.push("/"))
      .catch((err) => alert(err?.response?.data));
  };

  return (
    <Layout>
      <div className="container">
        <div className="colums">
          <div className="column is-8 is-offset-2">
            <ResourceForm onFormSubmit={createResource} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceCreate;
