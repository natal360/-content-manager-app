import Layout from "components/Layout";
import Link from "next/link";
import axios from "axios";
import ResourceLabe from "components/ResourceLabe.";
import moment from "moment";

const ResourceDetail = ({ resource }) => {
  const acitiveResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot active the resources!"));
  };
  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {moment(resource.createdAt).format("YYYY-MM-DD HH:MM")}
                      <ResourceLabe status={resource.status} />
                    </h2>
                    <h1 className="title">{resource.title}</h1>
                    <p>{resource.description}</p>
                    <p>Time to finish: {resource.timeToFinish} min</p>
                    {resource.status === "inactive" && (
                      <div>
                        <Link href={`/resources/${resource.id}/edit`}>
                          <a className="button is-warning">Update</a>
                        </Link>
                        <button
                          onClick={acitiveResource}
                          className="button is-success ml-1"
                        >
                          Activate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// getStaticProps 使用例　build時に全ての詳細ページを生成するので使用禁止
// export async function getStaticPaths() {
//   const resData = await fetch("http://localhost:3001/api/resources");
//   const data = await resData.json();
//   const paths = data.map((resource) => {
//     return {
//       params: { id: resource.id },
//     };
//   });

//   return {
//     paths, //paths: paths
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const dataRes = await fetch(
//     `http://localhost:3001/api/resources/${params.id}`
//   );
//   const data = await dataRes.json();

//   return {
//     props: {
//       resource: data,
//     },
//   };
// }

export async function getServerSideProps({ params }) {
  const dataRes = await fetch(
    `${process.env.API_URL}/resources/${params.id}`
  );
  const data = await dataRes.json();

  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceDetail;
