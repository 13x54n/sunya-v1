import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Benefits />
        <hr />
        <Section
          id="testimonials"
          title="What Our Team Says"
          description="Hear from those who visioned to built this product."
        >
          <Testimonials />
        </Section>
        <hr />
        <FAQ />
        <hr />
        <Stats />
      </Container>
    </>
  );
};

export default HomePage;
